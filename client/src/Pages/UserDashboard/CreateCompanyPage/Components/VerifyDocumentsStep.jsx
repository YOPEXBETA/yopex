import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";

const VerifyDocumentsStep = ({ control, formData, updateFormData }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Handle document change event
  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedDocument(file);
        updateFormData({ organizationDocument: [file] });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle document removal
  const handleDocumentRemove = () => {
    setSelectedDocument(null);
    updateFormData({ organizationDocument: null });
  };

  // Effect to update selectedDocument state when formData changes
  useEffect(() => {
    if (
      formData.organizationDocument &&
      formData.organizationDocument.length > 0
    ) {
      setSelectedDocument(formData.organizationDocument[0]);
    } else {
      setSelectedDocument(null);
    }
  }, [formData.organizationDocument]);

  return (
    <div>
      <h2 className="text-lg mb-4">
        If you’d like, you can provide your organization document to verify your
        account.
      </h2>
      <div>
        <Controller
          name="organizationDocument"
          control={control}
          defaultValue={formData.organizationDocument || ""}
          render={({ field }) => (
            <>
              <input
                type="file"
                id="organizationDocument"
                name="organizationDocument"
                className="sr-only"
                onChange={(e) => {
                  field.onChange(e.target.files);
                  handleDocumentChange(e); // Update local state
                }}
              />
              <label
                htmlFor="organizationDocument"
                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold dark:text-white">
                    Drop file here or click to upload
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Single file allowed
                  </span>
                  <span className="inline-flex rounded border hover:bg-zinc-200 dark:text-white border-[#e0e0e0] py-2 px-7 text-base font-medium">
                    Browse
                  </span>
                </div>
              </label>
            </>
          )}
        />
      </div>
      <div className="mt-4">
        {selectedDocument && (
          <div className="flex items-center justify-between mt-2">
            <a
              href={URL.createObjectURL(selectedDocument)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {selectedDocument.name}
            </a>
            <button
              type="button"
              onClick={handleDocumentRemove}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyDocumentsStep;
