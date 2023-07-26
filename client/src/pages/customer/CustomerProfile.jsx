import { useEffect, useState } from "react";
import { Header } from "../../components";
import API_WRAPPER from "../../api";
import { decodeToken } from "react-jwt";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null)
  const [editedRow, setEditedRow] = useState(null)
  const getCustomerInfo = async () => {
    const token = localStorage.getItem('token');
    const { id } = decodeToken(token);
    const response = await API_WRAPPER.get(`/customers/get-customer/:${id}`)
    console.log('CustomerProfile.jsx', response.data);
    setCustomer(response.data.customer)

  }
  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };
  console.log('CustomerProfile.jsx', customer);
  useEffect(() => {
    getCustomerInfo()
  }, [])
  console.log('CustomerProfile.jsx', editedRow);
  return (
    <div>
      <Header
        heading="Customer Profile"
        subheading="This page provides information regarding customer profile. Customer can change the profile information on this page"
      />
      <div className="w-full  mt-8">
        <div className="flex ">
          <div className="bg-base-200 shadow-md p-4 mx-4 w-2/3  rounded-xlv">
            <div className="flex gap-10">
              <div className="form-control">

                <label className="label">First Name</label>
                <input type="text" name="firstName" onChange={(e) => { handleEditChange(e) }} defaultValue={customer?.firstName} className="input input-accent" />
              </div>
              <div className="form-control">
                <label className="label">Last Name</label>
                <input type="text" name="lastName" onChange={(e) => { handleEditChange(e) }} defaultValue={customer?.lastName} className="input input-accent" />
              </div>
            </div>
            <div className="flex gap-10">
              <div className="form-control">
                <label className="label">email</label>
                <input type="text" name="email" onChange={(e) => { handleEditChange(e) }} defaultValue={customer?.email} className="input input-accent" />
              </div>
              <div className="form-control">
                <label className="label">Mobile</label>
                <input type="number" name="mobile" onChange={(e) => { handleEditChange(e) }} defaultValue={customer?.mobile} className="input input-accent" />
              </div>
            </div>

            <div className="flex gap-10">

              <div className="form-control">
                <label className="label">City</label>
                <input type="text" name="city" onChange={(e) => { handleEditChange(e) }} defaultValue={customer?.city} className="input input-accent" />
              </div>
              <div className="form-control">
                <label className="label">Pin Code</label>
                <input type="text" name="pincode" onChange={(e) => { handleEditChange(e) }} defaultValue={customer?.pincode} className="input input-accent" />
              </div>
            </div>
            <div className="my-10 flex justify-end mx-10">
              <button className="btn btn-accent">Update</button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
