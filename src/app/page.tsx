import CreateProfile from "./_components/CreateProfile";
import PaymentDetail from "./_components/PaymentDetails";
import Login from "./(auth)/login/Login";
import { SideBar } from "./_components/SideBar";

export default function Home() {
  return (
    <div>
      {/* <Login /> */}
      {/* <CreateProfile /> */}
      {/* <PaymentDetail /> */}
      <SideBar/>
    </div>
  );
}
