import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export function GenderDropDown() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Female</Label>
        </div>
      </div>
    </RadioGroup>
  );
}
