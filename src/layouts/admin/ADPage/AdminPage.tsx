import React from "react";
import ViewStudent from "../student/ViewStudent";
import NavBarAD from "../component/NavBarAD";


function AdminPage(){
    return(
        <div>
            <NavBarAD/>
            <ViewStudent/>
        </div>
    );
}

export default AdminPage;