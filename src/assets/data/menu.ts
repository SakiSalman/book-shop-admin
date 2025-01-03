const menu = [
    {
        sectionName: "Menu",
        items: [
            {
                id: 1,
                name: "Dashboard",
                icon: "<i class='bx bxs-dashboard'></i>",
                path: "/dashboard",
                items: [
                    {
                        id: 1,
                        name: "Admin Dashboard",
                        label: "",
                        labelColorClass: "",
                        path: "/",
                    },
                    {
                        id: 2,
                        name: "Sales Dashboard",
                        label: "",
                        labelColorClass: "",
                        path: "/sales-dashboard",
                    },
                ],
            },
        ],
    },
    {
        sectionName: "Inventory",
        items: [
            {
                id: 1,
                name: "Product",
                icon: "<i class='bx bxs-cube' ></i>",
                path: "/products",
                items: [
                ],
            },
        ],
    },
    {
        sectionName: "Orders",
        items: [
            {
                id: 1,
                name: "Orders",
                icon: "<i class='bx bxs-cube' ></i>",
                path: "/orders",
                items: [
                ],
            },
        ],
    },
    {
        sectionName: "CMS",
        items: [
            {
                id: 1,
                name: "App Setttings",
                icon: "<i class='bx bxs-devices'></i>",
                path: "/cms/app-settings",
                items: [
                ],
            },
        ],
    },

];

export default menu;
