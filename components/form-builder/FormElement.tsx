'use client';

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface FormElementProps {
  element: {
    id: string;
    type: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    options?: string[];
  };
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const FormElement: React.FC<FormElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'form-element',
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'form-element',
    drop: (item: { id: string }) => {
      if (item.id !== element.id) {
        // Handle reordering logic in parent
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const renderElement = () => {
    const commonProps = {
      className: 'w-full mt-1',
      placeholder: element.placeholder,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onUpdate({ ...element, value: e.target.value }),
    };

    switch (element.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
      case 'url':
        return <Input type={element.type} {...commonProps} />;
      case 'textarea':
        return <textarea className="w-full mt-1 p-2 border rounded" rows={3} {...commonProps} />;
      case 'select':
        return (
          <select className="w-full mt-1 p-2 border rounded bg-white" {...commonProps}>
            {element.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
      case 'radio':
        return (
          <div className="space-y-2 mt-2">
            {['Option 1', 'Option 2'].map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type={element.type}
                  id={`${element.id}-${index}`}
                  name={element.id}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`${element.id}-${index}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return <Input type="text" {...commonProps} />;
    }
  };

  return (
    <div
      ref={drop}
      className={`relative group border rounded p-4 mb-4 transition-all ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
      } ${isDragging ? 'opacity-50' : 'opacity-100'} ${isOver ? 'bg-blue-50' : 'bg-white'}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <button
            ref={drag}
            className="mr-2 text-gray-400 hover:text-gray-600 cursor-move"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical size={16} />
          </button>
          <Label className="font-medium">
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100">
          {onMoveUp && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
            >
              <ArrowUp size={14} />
            </Button>
          )}
          {onMoveDown && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
            >
              <ArrowDown size={14} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
      {renderElement()}
    </div>
  );
};
