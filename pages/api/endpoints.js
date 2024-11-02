export const endpoints = {
    productendpoints: {
        create: "createproduct",
        read: "productlist",
        single: "singleproduct",
        delete: "delete",
        edit: "editproduct"
    },
    employeeendpoints: {
        create: "createemployee",
        read: "employeelist",
        single: "singleemployee",
        delete: "deleteemployee",
        edit: "editemployee"
    }
}

export const myendpoints = [
    // Products
    endpoints.productendpoints.create,
    endpoints.productendpoints.read,
    endpoints.productendpoints.single,
    endpoints.productendpoints.delete,
    endpoints.productendpoints.edit,

    // Employee
    endpoints.employeeendpoints.create,
    endpoints.employeeendpoints.read,
    endpoints.employeeendpoints.single,
    endpoints.employeeendpoints.delete,
    endpoints.employeeendpoints.edit,
]