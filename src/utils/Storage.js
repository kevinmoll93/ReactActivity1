export const  GetDataLocalStorage = (item) => {
    const resultado = localStorage.getItem(item);

    if(resultado === null){
        return [];
    } else{
        return JSON.parse(resultado);
    }
}

export const InsertDataLocalStorage = (item,data) => {
    localStorage.setItem(item,JSON.stringify(data));
}

export const FilterData = (item,filter)  => {
const dataArr =GetDataLocalStorage(item);
if(dataArr.length === 0) return [];

const result = dataArr.filter(data => Number(data.id) !== Number(filter))
return result;
}

export const FilterSameData = (item,filter)  => {
const dataArr =GetDataLocalStorage(item);
if(dataArr.length === 0) return [];

const result = dataArr.filter(data => Number(data.id) === Number(filter))
return result;
}

