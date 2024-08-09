// import App from "./App";

// const getlocalStorage = () => {
//     let values = localStorage.getItem("jobApplication")
//     if (values) {
//       return (values = JSON.parse(localStorage.getItem("jobApplication")));
//     } else {
//       return [];
//     }
//   }
function Table() {
    return (
        <>
            <div>
            {/* <App /> */}
                <h1>Job Application Data</h1>
                <div className="tableData">
                    <table>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Coures</th>
                            <th>Experience HTML,CSS</th>
                            <th>JavaScript Experience</th>
                            <th>React Experience</th>
                            <th>Other Experience</th>
                            <th>Company Name</th>
                            <th>Resume</th>
                            <th>About</th>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Table;