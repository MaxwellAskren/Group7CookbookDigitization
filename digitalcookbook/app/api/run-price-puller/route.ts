//testing purposes only.. will be deleted
import { runOnce } from "@/app/_pricePulling/pricePuller";

export async function GET() {
    await runOnce();
    return Response.json({ status: "done" });
}