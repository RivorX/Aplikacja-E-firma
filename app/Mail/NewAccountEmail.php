<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewAccountEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $randomPassword;

    public function __construct($email, $randomPassword)
    {
        $this->email = $email;
        $this->randomPassword = $randomPassword;
    }

    public function build()
    {
        return $this->view('NewAccountEmail');
    }
}
