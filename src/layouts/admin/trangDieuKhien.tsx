import {useEffect, useState} from "react";
import {error} from "console";
import {getTotalNumberOfBooks, layToanBoSach} from "../../API/sachAPI";
import {ParameterDigital} from "./ParameterDigital";
import RequireAdmin from "./requite";

const  Dashboard =()=>{
    const [totalPrice, setTotalPrice] = useState(0);
    const [numberOfAccount, setNumberOfAccount] = useState(0);
    const [numberOfOrder, setNumberOfOrder] = useState(0);
    const [totalNumberOfBooks, setTotalNumberOfBooks] = useState(0);
    const [totalNumberOfFeedbacks, setTotalNumberOfFeedbacks] = useState(0);
    const [totalNumberOfReviews, setTotalNumberOfReviews] = useState(0);
  //  const [orders, setOrders] = useState<OrderModel[]>([]);
    // Lấy tổng số sách
    useEffect(() => {
getTotalNumberOfBooks().then((response:number)=>{
setTotalNumberOfBooks(response);
}).catch((error:any)=>console.log(error));
    }, []);
    return(
        <div>
            <ParameterDigital
                totalPrice={totalPrice}
                numberOfAccount={numberOfAccount}
                numberOfOrder={numberOfOrder}
                totalNumberOfBooks={totalNumberOfBooks}
                totalNumberOfFeedbacks={totalNumberOfFeedbacks}
                totalNumberOfReviews={totalNumberOfReviews}
            />
        </div>
    );
}
const DashboardPage = RequireAdmin(Dashboard);
export default DashboardPage;