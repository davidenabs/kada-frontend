// import toast from 'react-hot-toast';

// const toastConfig = {
//   duration: 4000,
//   position: 'top-right',
// };

export const showSuccessToast = () => {
  return <></>;
  // return (<section className="flex flex-col text-base font-bold leading-tight text-green-800 rounded-2xl max-w-[358px]">
  //   <div className="flex overflow-hidden flex-col w-full bg-white rounded-2xl">
  //     <div className="flex gap-10 items-start px-4 pt-2.5 pb-6 w-full">
  //       <div className="flex flex-auto gap-5 mt-4">
  //         <img src={avatarSrc} alt="User avatar" className="object-contain shrink-0 w-14 rounded-full aspect-[0.98]" />
  //         <p className="my-auto">Verification Successful {message}</p>
  //       </div>
  //       <img src={iconSrc} alt="" className="object-contain shrink-0 w-6 aspect-square" />
  //     </div>
  //   </div>
  // </section>);
  // toast.success(message, toastConfig);
};

export const showWarningToast = (message) => {
  return message;
  // toast(message, {
  //   ...toastConfig,
  //   icon: '⚠️',
  // });
};

export const showErrorToast = (message) => {
  return message;
  // toast.error(message, toastConfig);
};

export const showInfoToast = (message) => {
  return message;
  // toast(message, {
  //   ...toastConfig,
  //   icon: 'ℹ️',
  // });
};
