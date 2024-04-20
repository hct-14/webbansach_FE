
export async function my_request(duongDan:string) {
    const response = await fetch(duongDan);

    if( !response.ok){
        throw new Error(`khong the truy cap duong dan nay ${duongDan}`)
    }
    return response.json(); 
}