import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectTypes, projectTemplates, moodboards } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { StepIndicator } from "@/components/ui/step-indicator";
import { ProjectFormData } from "@/lib/types/ProjectConfig";
import { LoaderPinwheel, Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "@tanstack/react-router";
// import { Lock } from "lucide-react";

export function CreateProjectDialog() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    type: "",
    subtype: "",
    template: "",
    moodboard: "",
  });
  const [loading, setLoading] = useState(false);
  const steps = ["Project Details", "Type & Style", "Template", "Moodboard"];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (step === steps.length) {
      // Handle form submission here
      console.log("Form Data:", formData);
      setLoading(true); // Start loading
      setTimeout(() => {
        navigate({ to: "/project" });
        setLoading(false); // Stop loading after navigation or error
      }, 1000); // Simulate a delay of 1 second for the API call
      return;
    }
    nextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter project name"
                className="bg-cr8-dark/20 border-cr8-charcoal/10"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter project description"
                className="bg-cr8-dark/20 border-cr8-charcoal/10 min-h-[100px]"
              />
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={nextStep}
              disabled={!formData.name}
            >
              Next Step
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Project Type</Label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(projectTypes).map(
                  ([key, { icon: Icon, locked }]) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (!locked) {
                          setFormData({ ...formData, type: key, subtype: "" });
                        }
                      }}
                      disabled={locked} // Disable the button if locked
                      className={cn(
                        "p-4 rounded-lg border flex items-center gap-3 transition-all",
                        formData.type === key
                          ? "border-cr8-blue bg-cr8-blue/10"
                          : "border-cr8-charcoal/10 bg-cr8-dark/20 hover:bg-cr8-dark/30",
                        locked && "opacity-50 cursor-not-allowed" // Add styles for locked items
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      {locked && <Lock className="w-4 h-4 ml-auto" />}{" "}
                      {/* Add a lock icon */}
                    </button>
                  )
                )}
              </div>
            </div>

            {formData.type && (
              <div className="space-y-3">
                <Label>Project Subtype</Label>
                <div className="grid grid-cols-3 gap-3">
                  {projectTypes[formData.type].subtypes.map((subtype) => (
                    <button
                      key={subtype}
                      onClick={() => setFormData({ ...formData, subtype })}
                      className={cn(
                        "p-3 rounded-lg border text-sm transition-all",
                        formData.subtype === subtype
                          ? "border-cr8-blue bg-cr8-blue/10"
                          : "border-cr8-charcoal/10 bg-cr8-dark/20 hover:bg-cr8-dark/30"
                      )}
                    >
                      {subtype}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={prevStep}>
                Back
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={nextStep}
                disabled={!formData.type || !formData.subtype}
              >
                Next Step
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Select Moodboard</Label>
              {moodboards.length > 0 ? (
                <Select
                  value={formData.moodboard}
                  onValueChange={(value) => {
                    setFormData({ ...formData, moodboard: value });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a moodboard" />
                  </SelectTrigger>
                  <SelectContent>
                    {moodboards.map((moodboard, index) => (
                      <SelectItem key={index} value={moodboard.name}>
                        <div>
                          <p className="font-medium">{moodboard.name}</p>
                          <p className="text-sm text-gray-400">
                            {moodboard.description}
                          </p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => {
                    /* Open moodboard creation dialog */
                  }}
                >
                  <div>
                    <p className="font-medium">Create New Moodboard</p>
                    <p className="text-sm text-gray-400">
                      Start fresh with a new moodboard
                    </p>
                  </div>
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={prevStep}>
                Back
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={nextStep}
              >
                Next Step
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Select Template</Label>
              <div className="grid grid-cols-2 gap-4">
                {projectTemplates[formData.type]?.map((template) => (
                  <button
                    key={template.id}
                    onClick={() =>
                      setFormData({ ...formData, template: template.id })
                    }
                    className={cn(
                      "rounded-lg overflow-hidden transition-all",
                      formData.template === template.id
                        ? "ring-2 ring-cr8-blue"
                        : "ring-1 ring-cr8-charcoal/10 hover:ring-cr8-charcoal/30"
                    )}
                  >
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3 bg-black/40">
                      <p className="text-sm font-medium">{template.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={prevStep}>
                Back
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!formData.template || loading}
                onClick={onSubmit}
              >
                {loading && <LoaderPinwheel className="w-5 h-5 animate-spin" />}
                {loading ? "Preparing Set..." : "Create Project"}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-cr8-blue hover:bg-cr8-blue/60 text-white w-full"
          // disabled
        >
          {/* <Lock className="w-5 h-5 mr-2" /> */}
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-cr8-charcoal/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Project
          </DialogTitle>
        </DialogHeader>
        <StepIndicator steps={steps} currentStep={step} className="mb-6" />
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
