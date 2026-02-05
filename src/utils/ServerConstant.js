export const ServerConstant = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    auth: {
        login: "/user/login",
        register: "/user/register",
    },

    admin : {
        product: {
            get: "/product/get",
            add: "/product/add",
            update: "/product/update",
            delete: "/product/delete"
        },

        order : {
            get: "/booking/getBookings",
            update: "/booking/updateBooking",
            updateBookingStatus: "/booking/updateBookingStatus",
            delete: "/booking/deleteBooking"
        },

        customer: {
            get: "/user/getAllUsers",
            update: "/user/updateUser",
            delete: "/user/deleteUser"
        },

        category : {
            get: "/category/get",
            add: "/category/add",
            delete: "/category/delete"
        },

        dasboard: {
            get: "/dashboard/getDashboardDetails"
        }


    }
};