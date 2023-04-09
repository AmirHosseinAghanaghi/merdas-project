import * as yup from "yup"
yup.setLocale({
    number: {
        min: ({ min }) => ({ key: 'شماره ی وارد شده صحیح نمی باشد', values: { min } }),
        max: ({ max }) => ({ key: 'شماره ی وارد شده صحیح نمی باشد', values: { max } }),
      },
 })

export const cartFormSchema = yup.object().shape({
    firstName: yup.string("نام وارد شده صحیح نمی باشد").required("نام الزامی می باشد"),
    lastName: yup.string("نام خانوادگی وارد شده صحیح نمی باشد").required("نام خانوادگی الزامی می باشد"),
    address: yup.string("آدرس وارد شده صحیح نمی باشد").required("آدرس الزامی می باشد"),
    phoneNumber: yup.number("شماره ی وارد شده صحیح نمی باشد").required("شماره تلفن الزامی می باشد"),
    date: yup.date("آدرس وارد شده صحیح نمی باشد")
})