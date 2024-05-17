import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import login3 from "../assets/Images/ContactIMG/contactus1.jpg";
import contactvector from "../assets/Images/ContactIMG/contactmain.png";
import "../Global.css";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_API_EMAILJS_SERVICE_ID,
        "template_d913bff",
        form.current,
        {
          publicKey: "Qs_Q4Vece5V8XCzOZ",
        }
      )
      .then(
        () => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <>
      {" "}
      {/* {isLoading && <Loader />} */}
      <div
        className="flex items-center justify-center w-full mt-[-2.5rem] h-screen overflow-hidden bg-theme-puple300"
        style={{
          backgroundImage: `url(${login3})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      >
        <div
          className="flex items-center justify-center rounded-3xl 
  shadow-[0_8px_30px_rgb(0,0,0,0.15)]  backdrop-blur-sm bg-white/30
  xs:w-[80%] lg:w-[57%] xs:h-[60%] lg:h-[70%]"
        >
          <div
            className="lg:w-[45%] xs:w-full xs:h-full lg:h-[90%]
    rounded-3xl 
    bg-theme-ppk   
    "
          >
            <div
              className="flex flex-col items-center justify-center w-full h-full rounded-3xl p-7 "
              style={{
                boxShadow: "-80px 10px 100px 10px rgb(255, 255, 255,0.2)",
              }}
            >
              <div className="w-full pb-2 bg-red">
                <span className="block my-3 text-xl font-bold text-center">
                  Contact Us
                </span>
              </div>
              <form
                onSubmit={sendEmail}
                ref={form}
                className="flex flex-col w-full gap-3 text-sm bg-red"
              >
                <input
                  type="text"
                  className="bg-white rounded-xl focus:outline-none py-2 pl-3 lg:h-[3rem] placeholder-slate-700"
                  name="user_name"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  className="bg-white rounded-xl focus:outline-none py-2 pl-3 lg:h-[3rem] placeholder-slate-700"
                  name="user_email"
                  placeholder="example@gmail.com"
                  required
                />
                <input
                  type="text"
                  className="bg-white rounded-xl focus:outline-none py-2 pl-3 lg:h-[3rem] placeholder-slate-700"
                  name="subject"
                  placeholder="Subject"
                  required
                />
                <textarea
                  className="py-2 pl-3 bg-white rounded-xl focus:outline-none placeholder-slate-700"
                  name="message"
                  cols={30}
                  rows={5}
                  placeholder="Message"
                  required
                ></textarea>

                <button className="p-3 mb-3 text-white transition-all rounded-xl pinkgradient hover:scale-105">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div
            className="lg:flex xs:hidden w-[50%] flex-col items-center 
    justify-center p-5 rounded-t-none rounded-b-none 
    rounded-3xl"
          >
            {/* <div className="w-full mb-5  mb-[-10px]">
              <span className="block text-2xl font-bold text-center"></span>
            </div> */}
            <div className="">
              <img src={contactvector} alt="contactvector"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

//  // <div>
//   <h1>Contact</h1>

// <form onSubmit={sendEmail} ref={form}>
//   <div className="bg-red-300">
//     <label>Name</label>
//     <input
//       type="text"
//       name="user_name"
//       placeholder="Full Name"
//       required
//     />
//     <label>Email</label>
//     <input
//       type="email"
//       name="user_email"
//       placeholder="example@gmail.com"
//       required
//     />
//     <label>Subject</label>
//     <input type="text" name="subject" placeholder="Subject" required />
//     <label>Message</label>
//     <textarea name="message" cols={30} rows={10}></textarea>

//     <button className="bg-red-300">Send Message</button>
//   </div>
// </form>
// <div className="bg-blue-400">
//   <div className="bg-green-400">
//     <h3>Our Contact Information</h3>
//     <p>Fill the for or contact us via other channels listed below</p>
//       <div className="bg-purple-400">
//         <span>
//           <Phone />
//           <p>+91 12345 67890</p>
//         </span>
//         <span>
//           <Phone />
//           <p>+91 12345 67890</p>
//         </span>
//         <span>
//           <Phone />
//           <p>+91 12345 67890</p>
//         </span>
//         <span>
//           <Phone />
//           <p>+91 12345 67890</p>
//         </span>
//       </div>
//     </div>
//   </div>
// </div>
// <div className="flex items-center justify-center h-screen">
//   <div className="flex w-full max-w-lg p-8 bg-gray-100 rounded-lg">
//     <div className="w-1/2">
//       <h1 className="mb-4 text-2xl">Contact Us</h1>
//       <form onSubmit={sendEmail} ref={form}>
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-semibold">Name</label>
//           <input
//             type="text"
//             name="user_name"
//             placeholder="Full Name"
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-400"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-semibold">Email</label>
//           <input
//             type="email"
//             name="user_email"
//             placeholder="example@gmail.com"
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-400"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-semibold">
//             Subject
//           </label>
//           <input
//             type="text"
//             name="subject"
//             placeholder="Subject"
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-400"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-semibold">
//             Message
//           </label>
//           <textarea
//             name="message"
//             cols={30}
//             rows={5}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-400"
//           ></textarea>
//         </div>

//         <button className="w-full py-2 text-white transition duration-300 bg-red-400 rounded-md hover:bg-red-500">
//           Send Message
//         </button>
//       </form>
//     </div>
//     <div className="w-1/2 p-4 bg-blue-100 rounded-lg">
//       <h3 className="mb-2 text-lg font-semibold">
//         Our Contact Information
//       </h3>
//       <p className="mb-4 text-sm">
//         Fill the form or contact us via other channels listed below
//       </p>
//       <div className="space-y-2">
//         <div className="flex items-center space-x-2">
//           <Phone className="w-4 h-4 text-gray-600" />
//           <p>+91 12345 67890</p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Phone className="w-4 h-4 text-gray-600" />
//           <p>+91 12345 67890</p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Phone className="w-4 h-4 text-gray-600" />
//           <p>+91 12345 67890</p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Phone className="w-4 h-4 text-gray-600" />
//           <p>+91 12345 67890</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
