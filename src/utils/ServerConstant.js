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
            update: "/product/update"
        },

    }
};