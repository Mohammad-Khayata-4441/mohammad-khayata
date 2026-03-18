"use client";
import "swiper/css";
import React from "react";
import { type Project } from "@/services/portfolio";

export default function ProjectDetails(props: { project?: Project }) {
  return (
    <></>

    // <Modal size='5xl' onClose={() => router.push('/portfolio', { scroll: false })} isOpen={!!props.project}>
    //     <ModalContent>

    //         <ModalBody>
    //             <div className='p-4'>
    //                 <Swiper wrapperClass='flex items-center' >
    //                     {
    //                         props.project &&
    //                         props.project.screenShots.map((img, idx) => <SwiperSlide className='h-full' key={img}>
    //                             <div className="img-wrapper relative">

    //                                 <Image priority height="1080" width="1920"
    //                                     alt='project'
    //                                     src={`/projects/${props.project?.key}/${img}`}
    //                                 />
    //                             </div>
    //                         </SwiperSlide>
    //                         )
    //                     }
    //                 </Swiper>

    //             </div>
    //         </ModalBody>
    //     </ModalContent>
    // </Modal>
  );
}
