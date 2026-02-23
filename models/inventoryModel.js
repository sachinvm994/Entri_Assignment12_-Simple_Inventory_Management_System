import fs from "fs";

const inventoryFilePath = "./products.json";

export const readProducts = ()=>{
    const data = fs.readFileSync(inventoryFilePath);
    return JSON.parse(data);
};

export const writeProducts = (products)=>{
    fs.writeFileSync(inventoryFilePath,JSON.stringify(products,null,2));
}
