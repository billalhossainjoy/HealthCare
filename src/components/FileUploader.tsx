'use client'

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploderProps {
  files: File[] | undefined;
  onChange: (file: File[]) => void;
}

const FileUploader: React.FC<FileUploderProps> = ({ files, onChange }) => {
  const onDrop = useCallback(
    (acceptFiles: File[]) => {
      console.log(acceptFiles[0])
      onChange(acceptFiles);
    },
    [onChange]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className=" text-[14px] leading-[12px] font-normal flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 p-5"
    >
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="profile"
          width={1000}
          height={1000}
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="flex flex-col justify-center gap-3 text-center text-dark-600 ">
            <p>
              <span className="text-green-500">Click to upload </span>or drag
              and drop
            </p>
            <p>SVG, PNG JPG or GIF (max. 800*400px)</p>
          </div>
        </>
      )}
    </div>
  );
};
export default FileUploader;
