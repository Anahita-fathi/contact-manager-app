import * as Yap from 'yup';

export  const  contactSchema=Yap.object().shape({
    fullname:Yap.string().required('نام و نام خانوادگی الزامی است'),
    photo:Yap.string().url('آدرس معتبر نیست').required('آدرس عکس الزمی است.'),
    mobile:Yap.number().required('شماره تلفن الزامی است'),
    email:Yap.string().email('').required('ایمیل الزامی است'),
    job:Yap.string(),
    group:Yap.string().required('گروه الزامی است')

});