new Vue({
    el: '#menu',
    data: function() {
    return { listData: [
            {
                name: "Bảng điều khiển",
                icon: "fas fa-tachometer-alt",
                link: "/",
                listTreeView: []
            },
            {
                name: "Quản lý sản phẩm",
                icon: "fab fa-product-hunt",
                link: "/product",
                listTreeView: []
            },
            //Dropdown
            /*{
                name: "Phân tích kinh doanh",
                IfTree: "treeview-menu",
                icon: "fas fa-chart-bar",
                link: "/",
                listTreeView: [
                    {
                        name: "Thống kê sản phẩm",
                        icon: "fas fa-list",
                        link: "/Statistical/Product"
                    },
                    {
                        name: "Thống kê đơn hàng",
                        icon: "fas fa-list",
                        link: "/Statistical/Order"
                    },
                    {
                        name: "Thống kê doanh thu",
                        icon: "fas fa-list",
                        link: "/Statistical/Revenue"
                    },
                ]
            } 
            */
        ] }
    }
})