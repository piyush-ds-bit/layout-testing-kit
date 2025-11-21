import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { PipelineStepStatus } from "@/hooks/usePipelineAnimation";

interface ProcessingOverlayProps {
  status: PipelineStepStatus;
  stepLabel: string;
}

const processingMessages: Record<string, string[]> = {
  "Frame the Problem": ["Defining objectives...", "Identifying KPIs...", "Setting success metrics..."],
  "Data Gathering": ["Collecting data sources...", "Validating data quality...", "Merging datasets..."],
  "Exploratory Data Analysis": ["Analyzing distributions...", "Finding correlations...", "Detecting outliers..."],
  "Data Preprocessing": ["Cleaning null values...", "Encoding categories...", "Normalizing features..."],
  "Feature Engineering": ["Creating new features...", "Selecting best features...", "Transforming variables..."],
  "Model Selection": ["Evaluating algorithms...", "Comparing models...", "Selecting best fit..."],
  "Model Training": ["Training model...", "Tuning hyperparameters...", "Validating performance..."],
  "Model Evaluation": ["Calculating metrics...", "Generating reports...", "Testing predictions..."],
  "Optimization": ["Fine-tuning parameters...", "Improving accuracy...", "Finalizing model..."],
};

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ status, stepLabel }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = processingMessages[stepLabel] || ["Processing...", "Working...", "Almost done..."];

  useEffect(() => {
    if (status === "processing") {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [status, messages.length]);

  if (status === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#182437]/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg"
      >
        {status === "receiving" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-blue-400"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-6 h-6" />
              </motion.div>
              <span className="text-sm font-medium">Receiving data...</span>
            </div>
          </motion.div>
        )}

        {status === "processing" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-yellow-400"
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-6 h-6" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm font-medium"
                >
                  {messages[currentMessage]} ✓
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {status === "complete" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            className="text-green-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              <span className="text-sm font-medium">Complete!</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProcessingOverlay;
