import * as yup from "yup";

export const allProuductsFormSchema = yup.object().shape({
  name: yup.string("نام وارد شده صحیح نمی باشد").required("نام الزامی می باشد"),
  brand: yup
    .string("برند وارد شده صحیح نمی باشد")
    .required("برند الزامی می باشد"),
  image: yup.array("آدرس تصویر وارد شده معتبر نمی باشد"),

  thumbnail: yup.string("عکس وارد شده معتبر نمی باشد").nullable(),
  price: yup
    .number("قیمت وارد شده معتبر نمی باشد")
    .required("قیمت الزامی می باشد"),
  quantity: yup
    .number("تعداد وارد شده معتبر نمی باشد")
    .required("تعداد الزامی می باشد"),
  createdAt: yup.string().nullable(),
  category: yup
    .number("مجموعه ی وارد شده صحیح نمی باشد")
    .required(" انتخاب مجموعه الزامی می باشد"),
  subcategory: yup
    .number("زیر مجموعه ی وارد شده صحیح نمی باشد")
    .required("انتخاب زیر مجموعه الزامی می باشد"),
  description: yup
    .string("توضیح وارد شده صحیح نمی باشد")
    .required("نوشتن توضیحات الزامی می باشد"),
});
