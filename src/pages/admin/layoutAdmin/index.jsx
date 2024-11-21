import React from "react";
import SideBarAdmin from "../../../components/Admin/Sidebar";
import { LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from "react-router-dom";
import "./layoutAdmin.css";
import Dashboard from "../dashboard";
import Quyen from "../Quyen";
import San from "../San";

const LayoutAdmin = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <SideBarAdmin></SideBarAdmin>
          <div className="container_header_admin">
            <div className="flex_header_admin">
              <div className="button_logout">
                <Button color="danger" variant="outlined" iconPosition="start" icon={<LogoutOutlined />}>
                  Logout
                </Button>
              </div>
              <Link to="/admin/my_profile">
                <div className="block_thongtin">
                  <div class="img_icon_person">
                    <img src="/public/images/avatar.svg" alt="" />
                  </div>
                  <div><span>Thông tin</span></div>
                </div>
              </Link>

              {/* <div className="text_hover"><span>Thông tin cá nhân</span></div> */}
            </div>
          </div>
          <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 content-admin">
            <div className="block_margin_top">
              <Outlet></Outlet>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
