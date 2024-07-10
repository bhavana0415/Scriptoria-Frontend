export const fetchBooks = async() => {
    const url = "https://gutendex.com/books";
    try{
        const response = await fetch(url,{
            method: "GET",
        })
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            throw new Error("Failed to fetch Books");
        }
    }catch (error){
        console.log(error);
    }
}