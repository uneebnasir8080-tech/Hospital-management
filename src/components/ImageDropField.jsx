import { useState } from "react";
import { FormField } from "@/components/ui/form";

export default function ProfileImageField({ form }) {
  const [preview, setPreview] = useState(null);
  const handleFile = (file, field) => {
    console.log("first", file)
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    // store file url in form
    field.onChange(imageUrl);

    // if you ALSO need file later:
    // form.setValue("imageFile", file);
  };

  return (
    <FormField
      control={form.control}
      name="profileImage"
      render={({ field }) => (
        <div className="flex justify-center m-0">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile(e.dataTransfer.files[0], field);
            }}
            onClick={() =>
              document.getElementById("profileInput").click()
            }
            className="w-28 h-28 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            <input
              id="profileInput"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                handleFile(e.target.files[0], field)
              }
            />

            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-500 text-center px-2">
                Upload Profile Picture
              </span>
            )}
          </div>
        </div>
      )}
    />
  );
}
