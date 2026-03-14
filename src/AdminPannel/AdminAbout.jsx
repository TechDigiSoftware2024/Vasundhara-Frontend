// src/AdminPannel/AdminAbout.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Edit3,
  Trash2,
  Plus,
  Eye,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Loader2,
  Upload,
  Link as LinkIcon,
  RefreshCcw,
  Image as ImageIcon,
} from "lucide-react";

// Import API functions
import {
  // Hero APIs
  getHeroImages,
  createHero,
  updateHero,
  deleteHero,
  deleteAllHeroes,
  // About APIs
  getAboutSection,
  upsertAboutSection,
  resetAboutSection,
  // Areas APIs
  getAreas,
  createArea,
  updateArea,
  deleteArea,
  deleteAllAreas,
  // Utility
  fileToDataURL,
} from "../api/admin/aboutUsAdminApi";

// Constants
const DEFAULT_HERO_TITLE = "BETTER LIFE FOR FUTURE";
const MAX_DESCRIPTION_LENGTH = 800;

/* ---------- Reusable Toast Notification Component ---------- */
const ToastNotification = ({ message, type = "success", isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const styles = {
    success: { bg: "bg-green-600", icon: <CheckCircle size={20} /> },
    error: { bg: "bg-red-600", icon: <AlertTriangle size={20} /> },
    info: { bg: "bg-blue-600", icon: <Info size={20} /> },
  };

  const style = styles[type] || styles.success;

  return (
    <div
      className={`fixed top-5 right-5 z-[60] flex items-center p-4 rounded-lg shadow-lg ${style.bg} text-white transition-all duration-300 ease-in-out transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
    >
      {style.icon}
      <span className="ml-3">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 p-1 rounded-full hover:bg-white/20"
      >
        <X size={18} />
      </button>
    </div>
  );
};

/* ---------- Confirmation Modal ---------- */
const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="text-red-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- Image Preview Modal ---------- */
const PreviewModal = ({ isOpen, src, title, onClose }) => {
  if (!isOpen || !src) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <X size={20} className="text-red-600" />
        </button>
        {title && <h3 className="font-semibold text-lg mb-3">{title}</h3>}
        <img
          src={src}
          alt={title || "Preview"}
          className="w-full max-h-[80vh] object-contain rounded"
        />
      </div>
    </div>
  );
};

/* ---------- Enhanced Character Counter Component ---------- */
const CharacterCounter = ({ current, max }) => {
  const remaining = max - current;
  const percentage = (current / max) * 100;

  // Determine status
  const isOverLimit = current > max;
  const isAtLimit = current === max;
  const isWarning = remaining <= 100 && remaining > 0;
  const isNearWarning = remaining <= 200 && remaining > 100;

  // Determine color classes
  let textColorClass = "text-gray-500";
  let barColorClass = "bg-green-500";

  if (isOverLimit) {
    textColorClass = "text-red-600 font-bold";
    barColorClass = "bg-red-500";
  } else if (isAtLimit) {
    textColorClass = "text-orange-600 font-semibold";
    barColorClass = "bg-orange-500";
  } else if (isWarning) {
    textColorClass = "text-yellow-600 font-medium";
    barColorClass = "bg-yellow-500";
  } else if (isNearWarning) {
    textColorClass = "text-blue-600";
    barColorClass = "bg-blue-500";
  }

  return (
    <div className="mt-2 space-y-1">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${barColorClass}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Character count text */}
      <div className={`text-xs text-right flex justify-between items-center ${textColorClass}`}>
        <span>
          {isOverLimit && (
            <span className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Exceeds limit by {Math.abs(remaining)} characters
            </span>
          )}
          {isAtLimit && !isOverLimit && (
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Character limit reached
            </span>
          )}
          {isWarning && !isAtLimit && !isOverLimit && (
            <span>{remaining} characters remaining</span>
          )}
          {!isWarning && !isAtLimit && !isOverLimit && (
            <span></span>
          )}
        </span>
        <span>{current} / {max}</span>
      </div>
    </div>
  );
};

/* ---------- Validation Helper Function ---------- */
const validateDescription = (text, maxLength = MAX_DESCRIPTION_LENGTH) => {
  const length = text?.length || 0;
  return {
    isValid: length <= maxLength,
    length,
    remaining: maxLength - length,
    message: length > maxLength
      ? `Description exceeds maximum length by ${length - maxLength} characters`
      : null
  };
};

/* ---------- Truncate text to max length (for paste handling) ---------- */
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength);
};

/* ---------- Hero Form Modal (Title is hidden and auto-set) ---------- */
const HeroFormModal = ({ isOpen, onClose, onSave, editData, isLoading }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadType, setUploadType] = useState("file");
  const [order, setOrder] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setImageUrl(editData.imageUrl || "");
        setImagePreview(editData.computedImageUrl || editData.imageUrl || "");
        setUploadType(editData.useUpload ? "file" : "url");
        setOrder(editData.order || 0);
      } else {
        setImageUrl("");
        setImagePreview("");
        setUploadType("file");
        setOrder(0);
      }
      setImageFile(null);
    }
  }, [isOpen, editData]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setUploadType("file");
      const dataUrl = await fileToDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const handleUrlChange = (url) => {
    setImageUrl(url);
    setImagePreview(url);
    setImageFile(null);
    setUploadType("url");
  };

  const handleSubmit = () => {
    // Title is automatically set to DEFAULT_HERO_TITLE
    const heroData = {
      title: DEFAULT_HERO_TITLE,
      order,
      useUpload: uploadType === "file",
    };

    if (uploadType === "url") {
      heroData.imageUrl = imageUrl.trim();
    }

    onSave(heroData, uploadType === "file" ? imageFile : null);
  };

  const isFormValid =
    (uploadType === "file" && (imageFile || editData)) ||
    (uploadType === "url" && imageUrl.trim());

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {editData ? "Edit Hero Image" : "Add Hero Image"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Info Banner - Title is auto-assigned */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Auto-assigned Title</p>
              <p className="text-blue-600 mt-1">
                Title will be automatically set to: <strong>"{DEFAULT_HERO_TITLE}"</strong>
              </p>
            </div>
          </div>

          {/* Image Source Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Source <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUploadType("file")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${uploadType === "file"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
              <button
                type="button"
                onClick={() => setUploadType("url")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${uploadType === "url"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <LinkIcon className="w-4 h-4" /> URL
              </button>
            </div>
          </div>

          {uploadType === "file" ? (
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 transition"
              >
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload image</p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {imageFile && (
                <p className="text-sm text-green-600 mt-2">✓ {imageFile.name}</p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Order
            </label>
            <input
              type="number"
              min="0"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lower numbers appear first in the slider
            </p>
          </div>

          {/* Preview */}
          {imagePreview && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                  <span className="text-white font-bold text-lg text-center px-4">
                    {DEFAULT_HERO_TITLE}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid}
            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {editData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- Area Form Modal (with 800 char limit - ENHANCED) ---------- */
const AreaFormModal = ({ isOpen, onClose, onSave, editData, isLoading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadType, setUploadType] = useState("file");
  const [order, setOrder] = useState(0);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setTitle(editData.title || "");
        // Ensure existing description doesn't exceed limit
        const existingDesc = editData.description || "";
        setDescription(truncateText(existingDesc, MAX_DESCRIPTION_LENGTH));
        setImageUrl(editData.imageUrl || "");
        setImagePreview(editData.computedImageUrl || editData.imageUrl || "");
        setUploadType(editData.useUpload ? "file" : "url");
        setOrder(editData.order || 0);
      } else {
        setTitle("");
        setDescription("");
        setImageUrl("");
        setImagePreview("");
        setUploadType("file");
        setOrder(0);
      }
      setImageFile(null);
      setDescriptionError("");
    }
  }, [isOpen, editData]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setUploadType("file");
      const dataUrl = await fileToDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const handleUrlChange = (url) => {
    setImageUrl(url);
    setImagePreview(url);
    setImageFile(null);
    setUploadType("url");
  };

  // Enhanced description change handler with strict validation
  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    // Always allow if within limit
    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(value);
      setDescriptionError("");
    } else {
      // If exceeding, truncate and show error
      setDescription(truncateText(value, MAX_DESCRIPTION_LENGTH));
      setDescriptionError(`Maximum ${MAX_DESCRIPTION_LENGTH} characters allowed. Text has been truncated.`);

      // Clear error after 3 seconds
      setTimeout(() => setDescriptionError(""), 3000);
    }
  };

  // Handle paste event to prevent exceeding limit
  const handleDescriptionPaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const currentText = description;
    const cursorPos = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;

    // Calculate new text after paste
    const beforeCursor = currentText.substring(0, cursorPos);
    const afterCursor = currentText.substring(selectionEnd);
    const newText = beforeCursor + pastedText + afterCursor;

    if (newText.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(newText);
      setDescriptionError("");
    } else {
      // Truncate to fit
      const availableSpace = MAX_DESCRIPTION_LENGTH - beforeCursor.length - afterCursor.length;
      const truncatedPaste = pastedText.substring(0, Math.max(0, availableSpace));
      setDescription(beforeCursor + truncatedPaste + afterCursor);
      setDescriptionError(`Pasted text was truncated to fit ${MAX_DESCRIPTION_LENGTH} character limit.`);

      // Clear error after 3 seconds
      setTimeout(() => setDescriptionError(""), 3000);
    }
  };

  // Handle keydown to prevent typing beyond limit
  const handleDescriptionKeyDown = (e) => {
    const isAtLimit = description.length >= MAX_DESCRIPTION_LENGTH;
    const isControlKey = e.ctrlKey || e.metaKey;
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab'];

    if (isAtLimit && !allowedKeys.includes(e.key) && !isControlKey) {
      // Check if there's a selection (user might be replacing text)
      const hasSelection = textareaRef.current &&
        textareaRef.current.selectionStart !== textareaRef.current.selectionEnd;

      if (!hasSelection) {
        e.preventDefault();
        setDescriptionError(`Maximum ${MAX_DESCRIPTION_LENGTH} characters reached.`);
        setTimeout(() => setDescriptionError(""), 2000);
      }
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    // Final validation before submit
    const validation = validateDescription(description, MAX_DESCRIPTION_LENGTH);
    if (!validation.isValid) {
      setDescriptionError(validation.message);
      return;
    }

    const areaData = {
      title: title.trim(),
      description: description.trim(),
      order,
      useUpload: uploadType === "file",
    };

    if (uploadType === "url") {
      areaData.imageUrl = imageUrl.trim();
    }

    onSave(areaData, uploadType === "file" ? imageFile : null);
  };

  // Check if form is valid
  const isDescriptionValid = description.length <= MAX_DESCRIPTION_LENGTH;
  const isFormValid = title.trim() && isDescriptionValid && (
    (uploadType === "file" && (imageFile || editData)) ||
    (uploadType === "url" && imageUrl.trim())
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Sticky */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {editData ? "Edit Area" : "Add Area"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter area title"
            />
          </div>

          {/* Description with enhanced character limit */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
              <span className="text-gray-400 font-normal ml-1">
                (max {MAX_DESCRIPTION_LENGTH} characters)
              </span>
            </label>
            <textarea
              ref={textareaRef}
              value={description}
              onChange={handleDescriptionChange}
              onPaste={handleDescriptionPaste}
              onKeyDown={handleDescriptionKeyDown}
              rows={4}
              maxLength={MAX_DESCRIPTION_LENGTH}
              className={`w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:border-transparent transition-colors ${description.length >= MAX_DESCRIPTION_LENGTH
                  ? "border-orange-400 bg-orange-50 focus:ring-orange-500"
                  : description.length >= MAX_DESCRIPTION_LENGTH - 100
                    ? "border-yellow-400 bg-yellow-50 focus:ring-yellow-500"
                    : "border-gray-300 focus:ring-green-500"
                }`}
              placeholder="Enter area description"
            />

            {/* Error message */}
            {descriptionError && (
              <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                <AlertTriangle className="w-3 h-3" />
                {descriptionError}
              </div>
            )}

            {/* Character counter */}
            <CharacterCounter
              current={description.length}
              max={MAX_DESCRIPTION_LENGTH}
            />
          </div>

          {/* Image Source Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image Source
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setUploadType("file")}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${uploadType === "file"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
              <button
                type="button"
                onClick={() => setUploadType("url")}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${uploadType === "url"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <LinkIcon className="w-4 h-4" /> URL
              </button>
            </div>
          </div>

          {uploadType === "file" ? (
            <div className="space-y-2">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-colors"
              >
                <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload image</p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {imageFile && (
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {imageFile.name}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          {/* Order */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Display Order
            </label>
            <input
              type="number"
              min="0"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500">
              Lower numbers appear first
            </p>
          </div>

          {/* Preview */}
          {imagePreview && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Preview
              </label>
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer - Sticky */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editData ? "Update Area" : "Add Area"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Hero Image Manager ---------- */
const HeroManager = ({ showNotification }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formModal, setFormModal] = useState({ isOpen: false, editData: null });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    item: null,
  });

  const fetchImages = async () => {
    setIsLoading(true);
    const result = await getHeroImages();
    if (result.success) {
      setImages(result.data);
    } else {
      showNotification(result.error || "Failed to fetch hero images", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAdd = () => {
    setFormModal({ isOpen: true, editData: null });
  };

  const handleEdit = (image) => {
    setFormModal({ isOpen: true, editData: image });
  };

  const handleSave = async (heroData, imageFile) => {
    setActionLoading(true);

    let result;
    if (formModal.editData) {
      result = await updateHero(formModal.editData.id, heroData, imageFile);
    } else {
      result = await createHero(heroData, imageFile);
    }

    if (result.success) {
      showNotification(
        formModal.editData
          ? "Hero image updated successfully!"
          : "Hero image added successfully!"
      );
      setFormModal({ isOpen: false, editData: null });
      fetchImages();
    } else {
      showNotification(result.error || "Failed to save hero image", "error");
    }
    setActionLoading(false);
  };

  const handleDeleteClick = (image) => {
    setConfirmModal({ isOpen: true, item: image });
  };

  const handleDeleteConfirm = async () => {
    if (!confirmModal.item) return;

    setActionLoading(true);
    const result = await deleteHero(confirmModal.item.id);
    if (result.success) {
      showNotification("Hero image deleted successfully!");
      fetchImages();
    } else {
      showNotification(result.error || "Failed to delete hero image", "error");
    }
    setActionLoading(false);
    setConfirmModal({ isOpen: false, item: null });
  };

  const handleDeleteAll = async () => {
    setActionLoading(true);
    const result = await deleteAllHeroes();
    if (result.success) {
      showNotification("All hero images deleted!");
      setImages([]);
    } else {
      showNotification(
        result.error || "Failed to delete all hero images",
        "error"
      );
    }
    setActionLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Hero Section Images
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            All images display with title: "{DEFAULT_HERO_TITLE}"
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchImages}
            disabled={isLoading}
            className="bg-blue-50 text-blue-700 px-3 py-2 rounded flex items-center gap-1 hover:bg-blue-100 disabled:opacity-50"
          >
            <RefreshCcw
              size={16}
              className={isLoading ? "animate-spin" : ""}
            />
            Refresh
          </button>
          <button
            onClick={handleAdd}
            disabled={actionLoading}
            className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-green-700 disabled:opacity-50"
          >
            <Plus size={18} /> Add Image
          </button>
          {images.length > 0 && (
            <button
              onClick={handleDeleteAll}
              disabled={actionLoading}
              className="bg-red-100 text-red-700 px-3 py-2 rounded flex items-center gap-1 hover:bg-red-200 disabled:opacity-50"
            >
              <Trash2 size={16} /> Delete All
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No hero images yet. Click "Add Image" to get started.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative border rounded-lg overflow-hidden group"
            >
              <img
                src={img.computedImageUrl || img.imageUrl}
                alt={img.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=Image+Error";
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
                <h3 className="text-white text-xl font-bold text-center p-2">
                  {DEFAULT_HERO_TITLE}
                </h3>
              </div>
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                #{img.order || 0}
              </div>
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() =>
                    setPreview({
                      src: img.computedImageUrl || img.imageUrl,
                      title: DEFAULT_HERO_TITLE,
                    })
                  }
                  className="bg-blue-500 p-1.5 rounded text-white hover:bg-blue-600"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleEdit(img)}
                  className="bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteClick(img)}
                  className="bg-red-500 p-1.5 rounded text-white hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <PreviewModal
        isOpen={!!preview}
        src={preview?.src}
        title={preview?.title}
        onClose={() => setPreview(null)}
      />

      <HeroFormModal
        isOpen={formModal.isOpen}
        editData={formModal.editData}
        isLoading={actionLoading}
        onClose={() => setFormModal({ isOpen: false, editData: null })}
        onSave={handleSave}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title="Delete Hero Image"
        message={`Are you sure you want to delete this hero image? This action cannot be undone.`}
        isLoading={actionLoading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmModal({ isOpen: false, item: null })}
      />
    </div>
  );
};

/* ---------- About NGO Manager (with 800 char limit - ENHANCED) ---------- */
const AboutManager = ({ showNotification }) => {
  const [about, setAbout] = useState({
    title: "About Us",
    description: "",
    imageUrl: "",
    useUpload: false,
  });
  const [descriptionError, setDescriptionError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadType, setUploadType] = useState("url");
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const fetchAbout = async () => {
    setIsLoading(true);
    const result = await getAboutSection();
    if (result.success) {
      // Ensure description doesn't exceed limit
      const data = {
        ...result.data,
        description: truncateText(result.data.description || "", MAX_DESCRIPTION_LENGTH)
      };
      setAbout(data);
      setImagePreview(result.data.computedImageUrl || result.data.imageUrl || "");
      setUploadType(result.data.useUpload ? "file" : "url");
    } else {
      showNotification(result.error || "Failed to fetch about section", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setUploadType("file");
      const dataUrl = await fileToDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const handleUrlChange = (url) => {
    setAbout({ ...about, imageUrl: url });
    setImagePreview(url);
    setImageFile(null);
    setUploadType("url");
  };

  // Enhanced description change handler
  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      setAbout({ ...about, description: value });
      setDescriptionError("");
    } else {
      setAbout({ ...about, description: truncateText(value, MAX_DESCRIPTION_LENGTH) });
      setDescriptionError(`Maximum ${MAX_DESCRIPTION_LENGTH} characters allowed. Text has been truncated.`);
      setTimeout(() => setDescriptionError(""), 3000);
    }
  };

  // Handle paste event
  const handleDescriptionPaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const currentText = about.description;
    const cursorPos = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;

    const beforeCursor = currentText.substring(0, cursorPos);
    const afterCursor = currentText.substring(selectionEnd);
    const newText = beforeCursor + pastedText + afterCursor;

    if (newText.length <= MAX_DESCRIPTION_LENGTH) {
      setAbout({ ...about, description: newText });
      setDescriptionError("");
    } else {
      const availableSpace = MAX_DESCRIPTION_LENGTH - beforeCursor.length - afterCursor.length;
      const truncatedPaste = pastedText.substring(0, Math.max(0, availableSpace));
      setAbout({ ...about, description: beforeCursor + truncatedPaste + afterCursor });
      setDescriptionError(`Pasted text was truncated to fit ${MAX_DESCRIPTION_LENGTH} character limit.`);
      setTimeout(() => setDescriptionError(""), 3000);
    }
  };

  // Handle keydown
  const handleDescriptionKeyDown = (e) => {
    const isAtLimit = about.description.length >= MAX_DESCRIPTION_LENGTH;
    const isControlKey = e.ctrlKey || e.metaKey;
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab'];

    if (isAtLimit && !allowedKeys.includes(e.key) && !isControlKey) {
      const hasSelection = textareaRef.current &&
        textareaRef.current.selectionStart !== textareaRef.current.selectionEnd;

      if (!hasSelection) {
        e.preventDefault();
        setDescriptionError(`Maximum ${MAX_DESCRIPTION_LENGTH} characters reached.`);
        setTimeout(() => setDescriptionError(""), 2000);
      }
    }
  };

  const handleSave = async () => {
    // Validate before save
    const validation = validateDescription(about.description, MAX_DESCRIPTION_LENGTH);
    if (!validation.isValid) {
      setDescriptionError(validation.message);
      showNotification(validation.message, "error");
      return;
    }

    setActionLoading(true);

    const aboutData = {
      title: about.title,
      description: about.description.trim(),
      useUpload: uploadType === "file",
    };

    if (uploadType === "url") {
      aboutData.imageUrl = about.imageUrl;
    }

    const result = await upsertAboutSection(
      aboutData,
      uploadType === "file" ? imageFile : null
    );

    if (result.success) {
      showNotification("About section updated successfully!");
      setAbout(result.data);
      setImageFile(null);
    } else {
      showNotification(result.error || "Failed to update about section", "error");
    }
    setActionLoading(false);
  };

  const handleReset = async () => {
    setActionLoading(true);
    const result = await resetAboutSection();
    if (result.success) {
      showNotification("About section reset successfully!");
      setAbout({
        title: "About Us",
        description: "",
        imageUrl: "",
        useUpload: false,
      });
      setImagePreview("");
      setImageFile(null);
      setDescriptionError("");
    } else {
      showNotification(result.error || "Failed to reset about section", "error");
    }
    setActionLoading(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  const isDescriptionValid = about.description.length <= MAX_DESCRIPTION_LENGTH;

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">About Section</h2>
          <p className="text-sm text-gray-500 mt-1">
            Description limited to {MAX_DESCRIPTION_LENGTH} characters
          </p>
        </div>
        <button
          onClick={fetchAbout}
          disabled={isLoading}
          className="bg-blue-50 text-blue-700 px-3 py-2 rounded flex items-center gap-1 hover:bg-blue-100 disabled:opacity-50"
        >
          <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              className="border p-2.5 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Section Title"
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
              <span className="text-gray-400 font-normal ml-1">
                (max {MAX_DESCRIPTION_LENGTH} characters)
              </span>
            </label>
            <textarea
              ref={textareaRef}
              className={`border p-2.5 rounded-lg w-full h-40 focus:ring-2 focus:border-transparent transition-colors ${about.description.length >= MAX_DESCRIPTION_LENGTH
                ? "border-orange-400 bg-orange-50 focus:ring-orange-500"
                : about.description.length >= MAX_DESCRIPTION_LENGTH - 100
                  ? "border-yellow-400 bg-yellow-50 focus:ring-yellow-500"
                  : "border-gray-300 focus:ring-green-500"
                }`}
              placeholder="Description"
              value={about.description}
              onChange={handleDescriptionChange}
              onPaste={handleDescriptionPaste}
              onKeyDown={handleDescriptionKeyDown}
              maxLength={MAX_DESCRIPTION_LENGTH}
            />

            {/* Error message */}
            {descriptionError && (
              <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <AlertTriangle className="w-3 h-3" />
                {descriptionError}
              </div>
            )}

            <CharacterCounter
              current={about.description.length}
              max={MAX_DESCRIPTION_LENGTH}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Source
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUploadType("file")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${uploadType === "file"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
              <button
                type="button"
                onClick={() => setUploadType("url")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${uploadType === "url"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <LinkIcon className="w-4 h-4" /> URL
              </button>
            </div>
          </div>

          {uploadType === "file" ? (
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 transition"
              >
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload image</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {imageFile && (
                <p className="text-sm text-green-600 mt-2">✓ {imageFile.name}</p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                className="border p-2.5 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
                value={about.imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
              />
            </div>
          )}

          {imagePreview && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <img
                src={imagePreview}
                alt="About Preview"
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={actionLoading || !isDescriptionValid}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
        >
          {actionLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          Save
        </button>
        <button
          onClick={handleReset}
          disabled={actionLoading}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-200 disabled:opacity-50"
        >
          <Trash2 size={18} /> Reset
        </button>
      </div>
    </div>
  );
};

/* ---------- Areas We Work Manager ---------- */
const AreasManager = ({ showNotification }) => {
  const [areas, setAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [formModal, setFormModal] = useState({ isOpen: false, editData: null });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    item: null,
  });

  const fetchAreas = async () => {
    setIsLoading(true);
    const result = await getAreas();
    if (result.success) {
      setAreas(result.data);
    } else {
      showNotification(result.error || "Failed to fetch areas", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleAdd = () => {
    setFormModal({ isOpen: true, editData: null });
  };

  const handleEdit = (area) => {
    setFormModal({ isOpen: true, editData: area });
  };

  const handleSave = async (areaData, imageFile) => {
    setActionLoading(true);

    let result;
    if (formModal.editData) {
      result = await updateArea(formModal.editData.id, areaData, imageFile);
    } else {
      result = await createArea(areaData, imageFile);
    }

    if (result.success) {
      showNotification(
        formModal.editData
          ? "Area updated successfully!"
          : "Area added successfully!"
      );
      setFormModal({ isOpen: false, editData: null });
      fetchAreas();
    } else {
      showNotification(result.error || "Failed to save area", "error");
    }
    setActionLoading(false);
  };

  const handleDeleteClick = (area) => {
    setConfirmModal({ isOpen: true, item: area });
  };

  const handleDeleteConfirm = async () => {
    if (!confirmModal.item) return;

    setActionLoading(true);
    const result = await deleteArea(confirmModal.item.id);
    if (result.success) {
      showNotification("Area deleted successfully!");
      fetchAreas();
    } else {
      showNotification(result.error || "Failed to delete area", "error");
    }
    setActionLoading(false);
    setConfirmModal({ isOpen: false, item: null });
  };

  const handleDeleteAll = async () => {
    setActionLoading(true);
    const result = await deleteAllAreas();
    if (result.success) {
      showNotification("All areas deleted!");
      setAreas([]);
    } else {
      showNotification(result.error || "Failed to delete all areas", "error");
    }
    setActionLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Areas We Work</h2>
          <p className="text-sm text-gray-500 mt-1">
            Description limited to {MAX_DESCRIPTION_LENGTH} characters per area
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchAreas}
            disabled={isLoading}
            className="bg-blue-50 text-blue-700 px-3 py-2 rounded flex items-center gap-1 hover:bg-blue-100 disabled:opacity-50"
          >
            <RefreshCcw
              size={16}
              className={isLoading ? "animate-spin" : ""}
            />
            Refresh
          </button>
          <button
            onClick={handleAdd}
            disabled={actionLoading}
            className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-green-700 disabled:opacity-50"
          >
            <Plus size={18} /> Add Area
          </button>
          {areas.length > 0 && (
            <button
              onClick={handleDeleteAll}
              disabled={actionLoading}
              className="bg-red-100 text-red-700 px-3 py-2 rounded flex items-center gap-1 hover:bg-red-200 disabled:opacity-50"
            >
              <Trash2 size={16} /> Delete All
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      ) : areas.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No areas yet. Click "Add Area" to get started.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {areas.map((area) => (
            <div
              key={area.id}
              className="border p-4 rounded-lg relative group hover:shadow-md transition"
            >
              <img
                src={area.computedImageUrl || area.imageUrl}
                alt={area.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=Image+Error";
                }}
              />
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {area.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-400">
                      Order: #{area.order || 0}
                    </span>
                    <span className={`text-xs ${(area.description?.length || 0) >= MAX_DESCRIPTION_LENGTH
                      ? "text-orange-500"
                      : "text-gray-400"
                      }`}>
                      {area.description?.length || 0}/{MAX_DESCRIPTION_LENGTH} chars
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition ml-2">
                  <button
                    onClick={() => handleEdit(area)}
                    className="bg-blue-500 text-white p-1.5 rounded hover:bg-blue-600"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(area)}
                    className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AreaFormModal
        isOpen={formModal.isOpen}
        editData={formModal.editData}
        isLoading={actionLoading}
        onClose={() => setFormModal({ isOpen: false, editData: null })}
        onSave={handleSave}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title="Delete Area"
        message={`Are you sure you want to delete "${confirmModal.item?.title}"? This action cannot be undone.`}
        isLoading={actionLoading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmModal({ isOpen: false, item: null })}
      />
    </div>
  );
};

/* ---------- Main Admin Dashboard ---------- */
export default function AdminAbout() {
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showNotification = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const closeNotification = () => {
    setToast({ isVisible: false, message: "", type: "success" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        🌿 About Us Admin Dashboard
      </h1>
      <div className="grid gap-8 max-w-6xl mx-auto">
        <HeroManager showNotification={showNotification} />
        <AboutManager showNotification={showNotification} />
        <AreasManager showNotification={showNotification} />
      </div>

      <ToastNotification
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={closeNotification}
      />
    </div>
  );
}