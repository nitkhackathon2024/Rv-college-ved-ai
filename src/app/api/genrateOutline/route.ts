import { NextResponse, NextRequest } from "next/server";
import { CHECKER, GENRATE_OUTLINE } from "../../../../promt";
import { model } from "../../../../genAI";
import { db } from "@/lib/db"
import { extractAndParseJSON, ModuleCreator } from "@/lib/jsonParser"
import { ModuleData, CourseStatus } from "@/types"
import { updatePinecone } from "@/lib/pineconeDB";
import { client } from "../../../../genAI";

async function storeModuleData(modules: ModuleData[] | null, courseId: string) {


    if (modules && modules.length > 0) {
        try {
            const createdModules = await db.module.createMany({
                data: modules.map(module => ({
                    courseId: courseId, // Assuming courseId is defined earlier in your code
                    dayNumber: module.dayNumber,
                    moduleNumber: module.moduleNumber,
                    title: module.title,
                })),
            });

            console.log("Modules stored successfully:", createdModules);
        } catch (error) {
            console.error("Error storing module data:", error);
        }
    } else {
        console.log("No valid module data found in input.");
    }
}


export async function POST(req: NextRequest) {
    const data = await req.json()
    // console.log(data)


    try {
        let user = await db.user.findUnique({
            where: { id: data.userId },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" });
        }


        const currentTime = new Date();
        const lastUpdate = new Date(user.LastCreditUpdate);
        const timeDiff = Math.abs(currentTime.getTime() - lastUpdate.getTime());
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (dayDiff > 7) {
            const updatedUser = await db.user.update({
                where: { id: user.id },
                data: {
                    Credit: {
                        increment: 5,
                    },
                    LastCreditUpdate: currentTime,
                },
            });
            user = updatedUser;
        }

        if (user.Credit === null || user.Credit <= 0) {
            return NextResponse.json({ message: "Insufficient credit" });
        }

        const finalUser = await db.user.update({
            where: { id: user.id },
            data: {
                Credit: {
                    decrement: 1,
                },
            },
        });



        const prompt = CHECKER(data.course);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text: CourseStatus | null = extractAndParseJSON(response.text());


        if (text?.safe) {
            const genrate_promt = GENRATE_OUTLINE(data.course);
            const result = await model.generateContent(genrate_promt);
            const response = await result.response;
            const module_text = extractAndParseJSON(response.text());
            const ModuleText = ModuleCreator(response.text())
            console.log("Module-----------")
            console.log(ModuleText);

            const course = await db.course.create({
                data: {
                    userId: data.userId,
                    courseName: module_text?.name || "unknown",
                    numberOfDays: (typeof module_text?.numberofdays === 'string' ? parseInt(module_text.numberofdays, 10) : module_text?.numberofdays) || 5,
                    Introduction: module_text?.Introduction[0] || "unknown",
                    structure: JSON.stringify(module_text)
                },
            })

            const pinecone_data = {
                "id": course.id,
                "content": course.Introduction,
                "name": course.courseName
            }

            await updatePinecone(client, "course", pinecone_data)
            storeModuleData(ModuleText, course.id)
            return NextResponse.json(module_text);
        } else {
            try {
                return NextResponse.json({ message: text?.message });
            }
            catch {
                return NextResponse.json({ message: "Error" });
            }
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" });
    }

}



