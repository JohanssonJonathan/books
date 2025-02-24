export async function GET(req:Request){
    return new Response(JSON.stringify([]),{
        status:200,
        headers:{ "Content-Type": "application/json" }
    })
}
