// 'use client'

// import axios from 'axios';
// import { useState } from 'react';


// const adminPage = () => {

//     const [file, setFile] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await fetch('/api/handle-file', {
//       method: 'POST',
//       body: formData,
//     });
    
//     const data = await response.json();

//     if (data) {
//         const {response} = await axios.post('/api/send-product', {
//           data: data[0]
//         })
//     }

//   };



//   return (
//     <div className='flex justify-center'>
//       <div className='bg-gray-200 w-[500px] px-10 py-5 items-center flex flex-col'>
//             <h1 className='font-bold mb-5'>Sube tu excel con tus productos!</h1>

//             <form onSubmit={(e) => handleSubmit(e)} >

//             <div className='flex flex-col'>

//             <input className='mb-5' type="file" accept=".xlsx, .xls" onChange={(e) => setFile(e.target.files[0])} />
//             <button className='text-white px-2 py-1 rounded-md bg-blue-500' type="submit"
//             >Subir Archivo</button>

//             </div>

//             </form>

//       </div>
//     </div>
//   )
// }

// export default adminPage
