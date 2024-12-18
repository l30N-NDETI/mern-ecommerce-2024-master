import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Handle Upload Feature Image
  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      console.error("No image URL available");
      return; // prevent uploading if the URL is not set
    }

    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      } else {
        console.error("Error uploading image:", data?.payload?.message);
      }
    }).catch((error) => {
      console.error("Upload failed:", error);
    });
  }

  // Handle Delete Feature Image
  function handleDeleteFeatureImage(imageId) {
    dispatch(deleteFeatureImage(imageId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages()); // Re-fetch images after deletion
        toast({
          title: "Image deleted successfully",
        });
      } else {
        toast({
          title: "Failed to delete image",
          description: "There was an error deleting the image.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem) => (
            <div className="relative" key={featureImgItem.id}>
              <img
                src={featureImgItem.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
                alt="Feature"
              />
              {/* Delete Button */}
              <Button
                onClick={() => handleDeleteFeatureImage(featureImgItem.id)} // Pass the image ID for deletion
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p>No feature images available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
