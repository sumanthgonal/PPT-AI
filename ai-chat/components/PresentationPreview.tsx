"use client";

import { PresentationData } from "@/types";

interface PresentationPreviewProps {
  presentation: PresentationData;
  onDownload: () => void;
}

export default function PresentationPreview({
  presentation,
  onDownload,
}: PresentationPreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {presentation.title}
        </h2>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PPTX
        </button>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {presentation.slides.map((slide, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {slide.title}
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {slide.content.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
                {slide.notes && (
                  <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-gray-600 dark:text-gray-400">
                    <strong>Notes:</strong> {slide.notes}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Total slides: {presentation.slides.length}
      </div>
    </div>
  );
}
