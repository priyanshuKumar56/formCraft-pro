'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PageListProps {
  pages: Array<{
    id: string;
    title: string;
    type: string;
  }>;
  activePageId: string | null;
  onSelectPage: (pageId: string) => void;
  onAddPage: () => void;
  onRemovePage: (pageId: string) => void;
  onReorderPages?: (startIndex: number, endIndex: number) => void;
}

const SortablePageItem: React.FC<{
  id: string;
  title: string;
  isActive: boolean;
  onSelect: () => void;
  onRemove: () => void;
  disabled?: boolean;
}> = ({ id, title, isActive, onSelect, onRemove, disabled }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-2 rounded-md mb-1 ${
        isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
      } ${disabled ? 'opacity-50' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-center flex-1 min-w-0">
        <button
          {...attributes}
          {...listeners}
          className="mr-2 text-gray-400 hover:text-gray-600 cursor-move p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={16} />
        </button>
        <span className="truncate">{title}</span>
      </div>
      {!disabled && (
        <button
          className="text-gray-400 hover:text-red-500 p-1"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

export const PageList: React.FC<PageListProps> = ({
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onRemovePage,
  onReorderPages,
}) => {
  return (
    <div className="space-y-2">
      <div className="max-h-[400px] overflow-y-auto">
        {pages.map((page, index) => (
          <SortablePageItem
            key={page.id}
            id={page.id}
            title={page.title}
            isActive={page.id === activePageId}
            onSelect={() => onSelectPage(page.id)}
            onRemove={() => onRemovePage(page.id)}
            disabled={pages.length <= 1}
          />
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2"
        onClick={onAddPage}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Page
      </Button>
    </div>
  );
};
