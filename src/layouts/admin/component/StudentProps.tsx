import React, { useEffect, useState } from "react";
import HocSinhModel from "../../../models/HocSinhModel";


interface StudentPropsInterface{
    student: HocSinhModel;
}

const StudentProps: React.FC<StudentPropsInterface> = (props) => {

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                {/*<img*/}
                {/*    src={""}*/}
                {/*    className="card-img-top"*/}
                {/*        alt={props.sach.tenSach}*/}
                {/*    style={{ height: '200px' }}*/}
                {/*/>*/}
                <div className="card-body">
                    <h5 className="card-title">{props.student.department}</h5>
                    <p className="card-text">{props.student.first_name}</p>
                    <div className="price">
                        <span className="original-price">
                            <del>{props.student.last_name}</del>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default StudentProps ;
