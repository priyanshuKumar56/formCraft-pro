'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface ElementSettingsProps {
  element: {
    id: string;
    type: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    options?: string[];
  };
  onUpdate: (updates: any) => void;
  onRemove: () => void;
}

export const ElementSettings: React.FC<ElementSettingsProps> = ({
  element,
  onUpdate,
  onRemove,
}) => {
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(element.options || [])];
    newOptions[index] = value;
    onUpdate({ ...element, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(element.options || []), 'New Option'];
    onUpdate({ ...element, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = [...(element.options || [])];
    newOptions.splice(index, 1);
    onUpdate({ ...element, options: newOptions });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Element Settings</h3>
      
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={element.label}
          onChange={(e) => onUpdate({ ...element, label: e.target.value })}
          className="mt-1"
        />
      </div>

      {!['checkbox', 'radio'].includes(element.type) && (
        <div>
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input
            id="placeholder"
            value={element.placeholder || ''}
            onChange={(e) => onUpdate({ ...element, placeholder: e.target.value })}
            className="mt-1"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <Label htmlFor="required">Required</Label>
        <Switch
          id="required"
          checked={element.required}
          onCheckedChange={(checked) => onUpdate({ ...element, required: checked })}
        />
      </div>

      {(element.type === 'select' || element.type === 'checkbox' || element.type === 'radio') && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Options</Label>
            <Button variant="outline" size="sm" onClick={addOption}>
              Add Option
            </Button>
          </div>
          <div className="space-y-2">
            {element.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t">
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={onRemove}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Element
        </Button>
      </div>
    </div>
  );
};
