// import { useState, ChangeEvent, FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";
//
// interface Student {
//     firstName: string;
//     lastName: string;
//     email: string;
//     department: string;
// }
//
// const AddStudent: React.FC = () => {
//     const navigate = useNavigate();
//     const [student, setStudent] = useState<Student>({
//         firstName: "",
//         lastName: "",
//         email: "",
//         department: "",
//     });
//
//     const { firstName, lastName, email, department } = student;
//
//     const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setStudent({
//             ...student,
//             [e.target.name]: e.target.value,
//         });
//     };
//
//     const handleSubmit = (event: FormEvent) => {
//         event.preventDefault();
//         const token = localStorage.getItem('token');
//         fetch(  'http://localhost:8080/students',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type' : 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(student)
//             }
//         ).then((reponse)=>{
//             if(reponse.ok){
//                 alert("Đã thêm hoc sinh thành công!");
//                 setStudent({
//                     firstName: "",
//                     lastName: "",
//                     email: "",
//                     department: "",
//                 })
//             }else{
//                 alert("Gặp lỗi trong quá trình thêm hoc sinh!");
//             }
//         })
//     }
//
//
//     return (
//         <div className="col-sm-8 py-2 px-5 offset-2 shadow">
//             <h2 className="mt-5"> Add Student</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="input-group mb-5">
//                     <label className="input-group-text" htmlFor="firstName">
//                         First Name
//                     </label>
//                     <input
//                         className="form-control col-sm-6"
//                         type="text"
//                         name="firstName"
//                         id="firstName"
//                         required
//                         value={firstName}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//
//                 <div className="input-group mb-5">
//                     <label className="input-group-text" htmlFor="lastName">
//                         Last Name
//                     </label>
//                     <input
//                         className="form-control col-sm-6"
//                         type="text"
//                         name="lastName"
//                         id="lastName"
//                         required
//                         value={lastName}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//
//                 <div className="input-group mb-5">
//                     <label className="input-group-text" htmlFor="email">
//                         Your Email
//                     </label>
//                     <input
//                         className="form-control col-sm-6"
//                         type="email"
//                         name="email"
//                         id="email"
//                         required
//                         value={email}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//
//                 <div className="input-group mb-5">
//                     <label className="input-group-text" htmlFor="department">
//                         Department
//                     </label>
//                     <input
//                         className="form-control col-sm-6"
//                         type="text"
//                         name="department"
//                         id="department"
//                         required
//                         value={department}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//
//                 <div className="row mb-5">
//                     <div className="col-sm-2">
//                         <button type="submit" className="btn btn-outline-success btn-lg">
//                             Save
//                         </button>
//                     </div>
//
//                     <div className="col-sm-2">
//                         <Link to={"/view-students"} className="btn btn-outline-warning btn-lg">
//                             Cancel
//                         </Link>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };
//
// export default AddStudent;
