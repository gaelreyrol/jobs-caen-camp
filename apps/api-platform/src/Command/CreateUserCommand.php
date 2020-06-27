<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Validation;

class CreateUserCommand extends Command
{
    protected static $defaultName = 'app:create-user';

    private EntityManagerInterface $entityManager;

    private UserPasswordEncoderInterface $passwordEncoder;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->entityManager = $entityManager;
        $this->passwordEncoder = $passwordEncoder;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setDescription('Create user to access administration interface')
            ->addArgument('email', InputArgument::REQUIRED, 'Email of the user');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title('Creating new user');

        $email = $input->getArgument('email');

        $validator = Validation::createValidator();
        $violations = $validator->validate($email, [
            new Email(),
        ]);

        if (count($violations)) {
            foreach ($violations as $violation) {
                $output->writeln($violation);
            }
            return Command::FAILURE;
        }

        $passwordQuestion = new Question('What is the password?');
        $passwordQuestion->setHidden(true);
        $passwordQuestion->setHiddenFallback(false);

        $helper = $this->getHelper('question');
        $password = $helper->ask($input, $output, $passwordQuestion);

        $violations = $validator->validate($email, [
            new Length([
                'min' => 8
            ]),
        ]);

        if (count($violations)) {
            foreach ($violations as $violation) {
                $output->writeln($violation);
            }
            return Command::FAILURE;
        }

        $io->newLine();

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($this->passwordEncoder->encodePassword($user, $password));

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $output->writeln('User successfully created.');

        return Command::SUCCESS;
    }
}
