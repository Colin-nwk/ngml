<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceAdviceListItemResource extends JsonResource
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
            'daily_consumption_id' => $this->daily_consumption_id,
            'invoice_advice_id' => $this->invoice_advice_id,
            'volume' => $this->volume,
            'inlet_pressure' => $this->inlet_pressure,
            'outlet_pressure' => $this->outlet_pressure,
            'allocation' => $this->allocation,
            'nomination' => $this->nomination,
            'take_or_pay_value' => $this->take_or_pay_value,
            'daily_target' => $this->daily_target,
            'original_date' => $this->original_date?->toDateTimeString(),
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'customer_site' => new CustomerSiteResource($this->whenLoaded('customer_site')),
            'daily_consumption' => new DailyConsumptionResource($this->whenLoaded('daily_consumption')),
            'invoice_advice' => new InvoiceAdviceResource($this->whenLoaded('invoice_advice')),
        ];
    }
}
