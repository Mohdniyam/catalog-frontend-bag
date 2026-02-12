export interface AddressCardProps {
  address: any;
  index: number;
  isEditing: boolean;
  onChange: (id: number, field: string, value: string) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
}

export interface AddressSectionProps {
  addresses: any[];
  isEditing: boolean;
  onAdd: () => void;
  onRemove: (id: number) => void;
  onChange: (id: number, field: string, value: string) => void;
}
