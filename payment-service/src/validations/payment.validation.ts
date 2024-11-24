import * as yup from "yup";

export const orderSchema = yup.object({
  amount: yup
    .number()
    .required("Amount is required")
    .min(0, "Amount must be > 0"),
  currency: yup
    .string()
    .required("Currency is required")
    .equals(["VND", "USD", "ETH"]),
  message: yup.string().required("Message is required"),
  userID: yup.string().required("userID is required"),
  orderID: yup.string().required("Order ID is required"),
  returnUrl: yup.string().required("Return url is required"),
  orders: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Name is required"),
        image: yup.string().required("Image is required"),
        description: yup.string().required("Description is required"),
        quantity: yup
          .string()
          .matches(/^\d+$/, "Quantity must be a valid number")
          .required("Quantity is required"),
        price: yup.string().required("Price is required"),
      })
    )
    .optional(),
});
export const withdrawSchema = yup.object({
  amount: yup
    .number()
    .required("Amount is required")
    .min(0, "Amount must be > 0"),
  currency: yup
    .string()
    .required("Currency is required")
    .equals(["VND", "USD", "ETH"]),
  email: yup.string().required("Email is required"),
});
