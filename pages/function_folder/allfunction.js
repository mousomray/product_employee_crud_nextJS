import { toast } from "react-toastify";
import axiosInstance from "../api/api";
import { myendpoints } from "../api/endpoints";

// Create Product 
export const createproduct = async (data) => {
    try {
        const apiurl = myendpoints[0]
        const response = await axiosInstance.post(apiurl, data)
        console.log("Fetching product create data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        toast.error(error?.response?.data?.errors[0]);
        console.log("Error fetching product create data...", error);

    }
}

// Create Employee 
export const createemployee = async (data) => {
    try {
        const apiurl = myendpoints[5]
        const response = await axiosInstance.post(apiurl, data)
        console.log("Fetching employee create data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        toast.error(error?.response?.data?.errors[0]);
        console.log("Error fetching employee create data...", error);

    }
}

// List of Products
export const showproduct = async () => {
    try {
        const apiurl = myendpoints[1]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching product show data...", response);
        return response?.data?.products
    } catch (error) {
        console.log("Error fetching product show data...", error);

    }
}

// List of Employees
export const showemployee = async () => {
    try {
        const apiurl = myendpoints[6]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching employee show data...", response);
        return response?.data?.employees
    } catch (error) {
        console.log("Error fetching employee show data...", error);

    }
}

// Single product
export const singleproduct = async (id) => {
    try {
        const apiurl = `${myendpoints[2]}/${id}`
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching Single product  data...", response);
        return response
    } catch (error) {
        console.log("Error Fetching single product...", error);

    }
}

// Single employee
export const singleemployee = async (id) => {
    try {
        const apiurl = `${myendpoints[7]}/${id}`
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching Single employee  data...", response);
        return response
    } catch (error) {
        console.log("Error Fetching single employee...", error);

    }
}

// update product
export const updateproduct = async ({data,id}) => {
    try {
        const apiurl = `${myendpoints[4]}/${id}`
        const response = await axiosInstance.put(apiurl,data)
        console.log("Fetching Update product  data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error Fetching update product...", error);
        toast.error(error?.response?.data?.errors[0]);
    }
}

// update employee
export const updateemployee = async ({data,id}) => {
    try {
        const apiurl = `${myendpoints[9]}/${id}`
        const response = await axiosInstance.put(apiurl,data)
        console.log("Fetching Update employee  data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error Fetching update employee...", error);
        toast.error(error?.response?.data?.errors[0]);
    }
}

// Delete Product
export const deleteproduct = async (id) => {
    try {
        const apiurl = `${myendpoints[3]}/${id}`
        const response = await axiosInstance.delete(apiurl)
        console.log("Fetching Delete data...", response);
        return response
    } catch (error) {
        console.log("Error fetching Delete data...", error);
    }
}

// Delete Employee
export const deleteemployee = async (id) => {
    try {
        const apiurl = `${myendpoints[8]}/${id}`
        const response = await axiosInstance.delete(apiurl)
        console.log("Fetching Delete Employee data...", response);
        return response
    } catch (error) {
        console.log("Error fetching Delete Employee data...", error);
    }
}