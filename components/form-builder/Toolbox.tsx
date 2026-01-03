'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Type as TextIcon, 
  Mail as EmailIcon, 
  List as SelectIcon, 
  CheckSquare as CheckboxIcon, 
  CircleDot as RadioIcon,
  Hash as NumberIcon,
  Phone as PhoneIcon,
  Link as UrlIcon,
  TextCursor as TextareaIcon,
  Calendar as DateIcon
} from 'lucide-react';

interface ToolboxProps {
  onAddElement: (type: string) => void;
}

const formElements = [
  { type: 'text', label: 'Text', icon: <TextIcon size={16} /> },
  { type: 'email', label: 'Email', icon: <EmailIcon size={16} /> },
  { type: 'number', label: 'Number', icon: <NumberIcon size={16} /> },
  { type: 'tel', label: 'Phone', icon: <PhoneIcon size={16} /> },
  { type: 'url', label: 'URL', icon: <UrlIcon size={16} /> },
  { type: 'textarea', label: 'Text Area', icon: <TextareaIcon size={16} /> },
  { type: 'select', label: 'Dropdown', icon: <SelectIcon size={16} /> },
  { type: 'checkbox', label: 'Checkbox', icon: <CheckboxIcon size={16} /> },
  { type: 'radio', label: 'Radio Buttons', icon: <RadioIcon size={16} /> },
  { type: 'date', label: 'Date', icon: <DateIcon size={16} /> },
];

export const Toolbox: React.FC<ToolboxProps> = ({ onAddElement }) => {
  return (
    <div className="space-y-4">
      <div className="px-2">
        <h3 className="text-sm font-medium text-gray-700">Form Elements</h3>
        <p className="text-xs text-gray-500 mt-1">
          Drag and drop elements to the canvas
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 p-2">
        {formElements.map((element) => (
          <Button
            key={element.type}
            variant="outline"
            className="h-auto py-2 flex flex-col items-center justify-center text-center"
            onClick={() => onAddElement(element.type)}
          >
            <span className="mb-1">{element.icon}</span>
            <span className="text-xs">{element.label}</span>
          </Button>
        ))}
      </div>
      
      <div className="p-2">
        <h4 className="text-xs font-medium text-gray-500 mb-2">Layout</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-auto py-2 text-xs"
            onClick={() => onAddElement('section')}
          >
            Section
          </Button>
          <Button
            variant="outline"
            className="h-auto py-2 text-xs"
            onClick={() => onAddElement('divider')}
          >
            Divider
          </Button>
        </div>
      </div>
      
      <div className="p-2">
        <h4 className="text-xs font-medium text-gray-500 mb-2">Pre-built</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto py-2"
            onClick={() => onAddElement('name')}
          >
            <div>
              <p className="text-sm font-medium">Name</p>
              <p className="text-xs text-gray-500">First and last name fields</p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto py-2"
            onClick={() => onAddElement('address')}
          >
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-xs text-gray-500">Full address with postal code</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
