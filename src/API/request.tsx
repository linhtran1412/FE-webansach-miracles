export async function request(duongDan: string) {
//truyvan den duong dan
    const response = await fetch(duongDan);
//tra ve bi loi
    if (!response.ok) {
        throw new Error(`khong the truy cap duong dan :${duongDan}`);
    }
//neu tra ve ok
    return response.json();
}