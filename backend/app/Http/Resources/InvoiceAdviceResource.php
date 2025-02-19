<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceAdviceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'customer_site_id' => $this->customer_site_id,
            'created_by_id' => $this->created_by_id,
            'approval_level_id' => $this->approval_level_id,
            'with_vat' => $this->with_vat,
            'capex_recovery_amount' => $this->capex_recovery_amount,
            'invoice_advice_date' => $this->invoice_advice_date?->toDateTimeString(),
            'status' => $this->status,
            'from_date' => $this->from_date?->toDateString(),
            'to_date' => $this->to_date?->toDateString(),
            'total_quantity_of_gas' => $this->total_quantity_of_gas,
            'department' => $this->department,
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'customer_site' => new CustomerSiteResource($this->whenLoaded('customer_site')),
            'created_by' => new UserResource($this->whenLoaded('created_by')),
            'approval_level' => new ApprovalLevelResource($this->whenLoaded('approval_level')),
        ];
    }
}
