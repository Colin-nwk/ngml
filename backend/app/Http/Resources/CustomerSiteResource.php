<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerSiteResource extends JsonResource
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
            'created_by_user_id' => $this->created_by_user_id,
            'customer_id' => $this->customer_id,
            'location_id' => $this->location_id,
            'site_address' => $this->site_address,
            'site_name' => $this->site_name,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'site_contact_person_name' => $this->site_contact_person_name,
            'site_contact_person_email' => $this->site_contact_person_email,
            'site_contact_person_phone_number' => $this->site_contact_person_phone_number,
            'site_contact_person_signature' => $this->site_contact_person_signature,
            'site_existing_status' => $this->site_existing_status,
            'rate' => $this->rate,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'created_by_user' => new UserResource($this->whenLoaded('created_by_user')),
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'location' => new LocationResource($this->whenLoaded('location'))
        ];
    }
}
