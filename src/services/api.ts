
export type ModalData = {
  address:{
  street: string;
  suite: string;
  city:string;
  },
  company:{
    name: string;
    bs: string;
    }
}


export type Employee = ModalData &{
    name: string;
    id: number;
    username:string;
    email: string;
 }





  export async function fetchUsers(): Promise<Employee[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    try{
    const data = await response.json();
     return data;
    }
    catch (error:any) {
        return error.message;
      }
  }
 
 