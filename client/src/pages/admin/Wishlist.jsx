import { useEffect, useMemo, useState } from "react";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { getStatusStyles } from "../../utils";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])
    const fetchWishlist = async () => {
        console.log('Wishlist.jsx', "triggerd api");
        try {
            const response = await API_WRAPPER.get("/wishlist/getmywishlist");
            if (response.status === 200) {
                setWishlist(response?.data?.data?.wishlist);
                console.log("RESPONSE: ", response?.data?.data?.wishlist);
            }
        } catch (error) {
            console.error({ error, messge: error.message });
        }
        console.log('CustomerWishlist.jsx', wishlist);
    }
    const columns = useMemo(
        () => [
            {
                Header: "Product Id",
                accessor: "productId",
            },
            {
                Header: "Product Name",
                accessor: "productName",
            },
            {
                Header: "product Price",
                accessor: "productPrice",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ row }) => {
                    return getStatusStyles(row?.original?.status);
                },
            },
        ],
        []
    );
    const data = useMemo(() => wishlist, [wishlist]);
    useEffect(() => { fetchWishlist() }, [])
    return <div><Header heading="Admin Wishlist"
        subheading="A wish list  provides all the products added by the customer to wishlist . Customer can edit and delete the wishlist produts  from this UI"
    />
        <div className="w-full gap-4 mt-14">

            <div className="mt-4">
                <ReusableTable
                    tableTitle="Wishlist"
                    columns={columns}
                    data={data}
                    pageSize={"10"}
                    enablePagination
                // enableDelete
                // onDelete={handleDelete}
                />
            </div>
        </div></div>;
};

export default Wishlist;
