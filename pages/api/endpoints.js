export const endpoints = {
    productendpoints: {
        create: "createproduct",
        read: "productlist",
        single: "singleproduct",
        delete: "delete",
        edit: "editproduct",
        brandlist: "products/brands",
        singlebrand: "products/brand"
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
    endpoints.productendpoints.create, // 0
    endpoints.productendpoints.read, // 1
    endpoints.productendpoints.single, // 2 
    endpoints.productendpoints.delete, // 3
    endpoints.productendpoints.edit, // 4
    endpoints.productendpoints.brandlist, // 5
    endpoints.productendpoints.singlebrand, // 6

    // Employee
    endpoints.employeeendpoints.create, // 7
    endpoints.employeeendpoints.read, // 8
    endpoints.employeeendpoints.single, // 9
    endpoints.employeeendpoints.delete, // 10
    endpoints.employeeendpoints.edit, // 11
]